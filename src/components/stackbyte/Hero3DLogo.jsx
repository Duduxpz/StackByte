import { useEffect, useRef } from 'react';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  SRGBColorSpace,
  ACESFilmicToneMapping,
  CubeTexture,
  Shape,
  ExtrudeGeometry,
  MeshPhysicalMaterial,
  DoubleSide,
  Group,
  Mesh,
  Box3,
  Sphere,
  MathUtils,
  AmbientLight,
  DirectionalLight,
  PointLight,
  Clock,
} from 'three';

// Turns a 3-point centerline (T -> A -> B) into a closed, uniform-thickness
// chevron polygon with a mitered inner joint at A and flat (butt) caps at T/B.
// Not used directly anymore (we use the exact traced points below), kept for reference.

// Exact outline points traced from the StackByte logo file (two bracket arms + center square).
const LEFT_ARM = [[-23.6,40.08],[-47.44,8.72],[-47.6,-7.28],[-23.92,-40.08],[-3.44,-40.08],[-33.36,1.68],[-3.28,40.08]];
const RIGHT_ARM = [[3.28,40.08],[33.36,1.68],[3.6,-40.08],[23.92,-40.08],[47.6,-7.44],[47.6,8.56],[23.76,40.08]];
const SQUARE = [[-9.68,10.32],[-10.16,9.84],[-10.16,-9.68],[-9.68,-10.16],[10.0,-10.0],[10.16,10.0]];

function shapeFromPoints(pts) {
  const shape = new Shape();
  pts.forEach(([x, y], i) => (i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y)));
  shape.closePath();
  return shape;
}

function makeFaceCanvas(topColor, bottomColor, accent) {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, topColor);
  g.addColorStop(1, bottomColor);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  if (accent) {
    ctx.fillStyle = accent;
    ctx.fillRect(0, 90, 256, 20);
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(0, 150, 256, 6);
  }
  return c;
}

function responsiveScale(width) {
  if (width < 480) return 6.5;   // celular pequeno
  if (width < 768) return 12.0;   // celular grande / tablet
  if (width < 1200) return 16.8;  // notebook
  return 17.6;                    // desktop grande
}

/**
 * Renders the StackByte "< [ ] >" mark as an extruded, chrome-orange 3D
 * object with studio-style lighting. Fills its parent container (give the
 * wrapper a fixed height via className, e.g. "h-[420px] w-full").
 */
export default function Hero3DLogo({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;
    const isMobile = width < 768;

    const scene = new Scene();
    scene.background = null;

    const camera = new PerspectiveCamera(44, width / height, 0.1, 6000);
    camera.position.set(0, 10, 2600);

    const renderer = new WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;
    mount.appendChild(renderer.domElement);

    // ---------- procedural studio environment (for chrome reflections) ----------
    const envFaces = [
      makeFaceCanvas('#3a1c08', '#080505', 'rgba(255,255,255,0.55)'),
      makeFaceCanvas('#3a1c08', '#080505', 'rgba(255,157,0,0.5)'),
      makeFaceCanvas('#ffffff', '#5a5a60'),
      makeFaceCanvas('#0a0705', '#000000'),
      makeFaceCanvas('#3a1c08', '#080505', 'rgba(255,157,0,0.55)'),
      makeFaceCanvas('#2a1506', '#080505', 'rgba(255,255,255,0.45)'),
    ];
    const envMap = new CubeTexture(envFaces);
    envMap.needsUpdate = true;
    scene.environment = envMap;

    // ---------- logo geometry ----------
    const extrudeSettings = {
      depth: 16,
      bevelEnabled: true,
      bevelThickness: 2.2,
      bevelSize: 2.2,
      bevelSegments: isMobile ? 3 : 6,
      curveSegments: isMobile ? 6 : 12,
    };
    const squareExtrude = { ...extrudeSettings, depth: 14, bevelThickness: 1.6, bevelSize: 1.6 };

    const chromeMat = new MeshPhysicalMaterial({
      color: 0xfd7b01,
      metalness: 1,
      roughness: 0.05,
      clearcoat: 1,
      clearcoatRoughness: 0.02,
      envMapIntensity: 2.1,
      reflectivity: 1,
      side: DoubleSide,
      emissive: 0x3a1600,
      emissiveIntensity: 0.08,
    });

    const logoGroup = new Group();
    [LEFT_ARM, RIGHT_ARM].forEach((pts) => {
      const geo = new ExtrudeGeometry(shapeFromPoints(pts), extrudeSettings);
      const mesh = new Mesh(geo, chromeMat);
      mesh.position.z = -extrudeSettings.depth / 2;
      mesh.frustumCulled = false;
      logoGroup.add(mesh);
    });
    const sqGeo = new ExtrudeGeometry(shapeFromPoints(SQUARE), squareExtrude);
    const sqMesh = new Mesh(sqGeo, chromeMat);
    sqMesh.position.z = -squareExtrude.depth / 2;
    logoGroup.add(sqMesh);

    logoGroup.scale.setScalar(responsiveScale(width));
    // Move the 3D mark slightly to the right inside the hero.
    logoGroup.position.x = width < 768 ? 105 : 235;
    scene.add(logoGroup);

    // Keep the entire 3D mark inside the canvas at every rotation angle.
    // The old fixed camera distance was too close for the enlarged logo,
    // causing it to be clipped as the object rotated.
    const fitCamera = () => {
      logoGroup.updateMatrixWorld(true);
      const box = new Box3().setFromObject(logoGroup);
      const sphere = box.getBoundingSphere(new Sphere());
      const halfFov = MathUtils.degToRad(camera.fov * 0.5);
      const distanceForHeight = sphere.radius / Math.tan(halfFov);
      const distanceForWidth = sphere.radius / (Math.tan(halfFov) * camera.aspect);
      const distance = Math.max(distanceForHeight, distanceForWidth) * 1.32;
      camera.position.z = Math.max(1500, distance);
      // Keep the logo visually to the right while leaving enough horizontal breathing room.
      const viewTargetX = width < 768 ? 45 : 95;
      camera.lookAt(viewTargetX, 0, 0);
    };
    fitCamera();

    // ---------- lighting ----------
    scene.add(new AmbientLight(0x1a1418, 0.5));
    const key = new DirectionalLight(0xffffff, 1.6);
    key.position.set(980, 1400, 1680);
    scene.add(key);
    const rim = new PointLight(0xffffff, 2.2, 6300);
    rim.position.set(140, 980, -1540);
    scene.add(rim);
    if (!isMobile) {
      const warm = new PointLight(0xff9d00, 1.6, 4900);
      warm.position.set(-1190, 420, 1400);
      scene.add(warm);
      const kicker = new PointLight(0xfd7b01, 2.0, 4900);
      kicker.position.set(1260, 420, 840);
      scene.add(kicker);
    }

    // ---------- interaction ----------
    let mouseX = 0, mouseY = 0, curX = 0, curY = 0;
    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    };
    window.addEventListener('mousemove', onMouseMove);

    const clock = new Clock();
    let frameId;
    let running = true;
    function animate() {
      if (!running) return;
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      curX += (mouseX - curX) * 0.05;
      curY += (mouseY - curY) * 0.05;
      logoGroup.rotation.y = t * 0.25 + curX * 0.8;
      logoGroup.rotation.x = curY * 0.35;
      renderer.render(scene, camera);
    }
    animate();

    const onVisibility = () => {
      running = !document.hidden;
      if (running) {
        clock.getDelta(); // avoid a big time jump after coming back
        animate();
      } else {
        cancelAnimationFrame(frameId);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    const onResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      logoGroup.scale.setScalar(responsiveScale(width));
      logoGroup.position.x = width < 768 ? 105 : 235;
      fitCamera();
    };
    window.addEventListener('resize', onResize);

    return () => {
      running = false;
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      renderer.dispose();
      chromeMat.dispose();
      envFaces.forEach(() => {});
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={className} />;
}