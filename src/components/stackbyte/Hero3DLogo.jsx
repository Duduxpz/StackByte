import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Turns a 3-point centerline (T -> A -> B) into a closed, uniform-thickness
// chevron polygon with a mitered inner joint at A and flat (butt) caps at T/B.
// Not used directly anymore (we use the exact traced points below), kept for reference.

// Exact outline points traced from the StackByte logo file (two bracket arms + center square).
const LEFT_ARM = [[-23.6,40.08],[-47.44,8.72],[-47.6,-7.28],[-23.92,-40.08],[-3.44,-40.08],[-33.36,1.68],[-3.28,40.08]];
const RIGHT_ARM = [[3.28,40.08],[33.36,1.68],[3.6,-40.08],[23.92,-40.08],[47.6,-7.44],[47.6,8.56],[23.76,40.08]];
const SQUARE = [[-9.68,10.32],[-10.16,9.84],[-10.16,-9.68],[-9.68,-10.16],[10.0,-10.0],[10.16,10.0]];

function shapeFromPoints(pts) {
  const shape = new THREE.Shape();
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
  if (width < 480) return 6.5;
  if (width < 768) return 7.8;
  if (width < 1200) return 8.8;
  return 9.5;
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

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 2000);
    camera.position.set(0, 10, 1800);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
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
    const envMap = new THREE.CubeTexture(envFaces);
    envMap.needsUpdate = true;
    scene.environment = envMap;

    // ---------- logo geometry ----------
    const extrudeSettings = {
      depth: 16, bevelEnabled: true, bevelThickness: 2.2, bevelSize: 2.2, bevelSegments: 6, curveSegments: 12,
    };
    const squareExtrude = { ...extrudeSettings, depth: 14, bevelThickness: 1.6, bevelSize: 1.6 };

    const chromeMat = new THREE.MeshPhysicalMaterial({
      color: 0xfd7b01,
      metalness: 1,
      roughness: 0.05,
      clearcoat: 1,
      clearcoatRoughness: 0.02,
      envMapIntensity: 2.1,
      reflectivity: 1,
    });

    const logoGroup = new THREE.Group();
    [LEFT_ARM, RIGHT_ARM].forEach((pts) => {
      const geo = new THREE.ExtrudeGeometry(shapeFromPoints(pts), extrudeSettings);
      const mesh = new THREE.Mesh(geo, chromeMat);
      mesh.position.z = -extrudeSettings.depth / 2;
      logoGroup.add(mesh);
    });
    const sqGeo = new THREE.ExtrudeGeometry(shapeFromPoints(SQUARE), squareExtrude);
    const sqMesh = new THREE.Mesh(sqGeo, chromeMat);
    sqMesh.position.z = -squareExtrude.depth / 2;
    logoGroup.add(sqMesh);

    logoGroup.scale.setScalar(responsiveScale(width));
    scene.add(logoGroup);

    // ---------- lighting ----------
    scene.add(new THREE.AmbientLight(0x1a1418, 0.5));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(980, 1400, 1680);
    scene.add(key);
    const warm = new THREE.PointLight(0xff9d00, 1.6, 4900);
    warm.position.set(-1190, 420, 1400);
    scene.add(warm);
    const rim = new THREE.PointLight(0xffffff, 2.2, 6300);
    rim.position.set(140, 980, -1540);
    scene.add(rim);
    const kicker = new THREE.PointLight(0xfd7b01, 2.0, 4900);
    kicker.position.set(1260, 420, 840);
    scene.add(kicker);

    // ---------- interaction ----------
    let mouseX = 0, mouseY = 0, curX = 0, curY = 0;
    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    };
    window.addEventListener('mousemove', onMouseMove);

    const clock = new THREE.Clock();
    let frameId;
    function animate() {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      curX += (mouseX - curX) * 0.05;
      curY += (mouseY - curY) * 0.05;
      logoGroup.rotation.y = t * 0.25 + curX * 0.8;
      logoGroup.rotation.x = curY * 0.35;
      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      logoGroup.scale.setScalar(responsiveScale(width));
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      chromeMat.dispose();
      envFaces.forEach(() => {});
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={className} />;
}