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

const LEFT_ARM = [
  [-23.6, 40.08],
  [-47.44, 8.72],
  [-47.6, -7.28],
  [-23.92, -40.08],
  [-3.44, -40.08],
  [-33.36, 1.68],
  [-3.28, 40.08],
];

const RIGHT_ARM = [
  [3.28, 40.08],
  [33.36, 1.68],
  [3.6, -40.08],
  [23.92, -40.08],
  [47.6, -7.44],
  [47.6, 8.56],
  [23.76, 40.08],
];

const SQUARE = [
  [-9.68, 10.32],
  [-10.16, 9.84],
  [-10.16, -9.68],
  [-9.68, -10.16],
  [10, -10],
  [10.16, 10],
];

function shapeFromPoints(points) {
  const shape = new Shape();

  points.forEach(([x, y], index) => {
    if (index === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  });

  return shape;
}

function makeFaceCanvas(topcolor, bottomcolor, accent) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;

  const ctx = canvas.getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, 0, 512);

  gradient.addColorStop(0, topcolor);
  gradient.addColorStop(1, bottomcolor);

  context.fillStyle = accent;
  context.fillRect(0, 0, 512, 512);

  if (accent) {
    constext.fillStyle = accent;
    context.fillRect(0, 170, 512, 34);

  context.fillStyle = 'rgba(255,255,255,0.12)';
    context.fillRect(0, 300, 512, 10);
  }

  return canvas;
}

function responsiveScale(width) {
  if (width < 390) return 6.2;
  if (width < 480) return 7.8;
  if (width < 768) return 9.8;
  if (width < 1200) return 16.5;

  return 17.6;
}

export default function Hero3DLogo ({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) return undefined;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    if (!width || !height) return undefined;

    const isMobile = width < 768;
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const scene = new Scene();
    
    const camera = new PerspectiveCamera (
      42,
      width / height,
      0.1,
      6000
    );

    camera.position.set(0, 0, 2600);

    const renderer =new WebGLRenderer ({
      antialias: !ismobile,
      alpha: true,
      powerPreference: 'high-performance',
    });

    renderer.setSize(width, height);

    rederer.setPixelRatio(
      math.min (
        window.devicePixelRatio || 1,
        instance.isMobile ? 1.35 : 2,
      ),
    );
      renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.touchAction = 'none';

    mount.appendChild(renderer.domElement);

    // --------------------------------------------------
    // ENVIRONMENT
    // --------------------------------------------------

    const envFaces = [
      makeFaceCanvas(
        '#3b1c08',
        '#050303',
        'rgba(255,255,255,0.6)',
      ),

      makeFaceCanvas(
        '#512707',
        '#080505',
        'rgba(255,157,0,0.65)',
      ),

      makeFaceCanvas(
        '#ffffff',
        '#626268',
        'rgba(255,255,255,0.8)',
      ),

      makeFaceCanvas(
        '#0b0705',
        '#000000',
        null,
      ),

      makeFaceCanvas(
        '#3b1c08',
        '#080505',
        'rgba(255,157,0,0.65)',
      ),

      makeFaceCanvas(
        '#2a1506',
        '#070403',
        'rgba(255,255,255,0.5)',
      ),
    ];

    const envMap = new CubeTexture(envFaces);

    envMap.needsUpdate = true;

    scene.environment = envMap;

    // --------------------------------------------------
    // MATERIAL
    // --------------------------------------------------

    const chromeMaterial = new MeshPhysicalMaterial({
      color: 0xfd7b01,
      metalness: 1,
      roughness: 0.075,

      clearcoat: 1,
      clearcoatRoughness: 0.025,

      envMapIntensity: 2.5,
      reflectivity: 1,

      emissive: 0x3a1600,
      emissiveIntensity: 0.075,

      side: DoubleSide,
    });

    // --------------------------------------------------
    // GEOMETRY
    // --------------------------------------------------

    const extrudeSettings = {
      depth: 18,

      bevelEnabled: true,
      bevelThickness: 2.5,
      bevelSize: 2.5,

      bevelSegments: isMobile ? 4 : 8,
      curveSegments: isMobile ? 8 : 16,

      steps: 1,
    };

    const squareExtrude = {
      ...extrudeSettings,
      depth: 16,
      bevelThickness: 1.8,
      bevelSize: 1.8,
    };

    const logoGroup = new Group();

    const geometries = [];

    [LEFT_ARM, RIGHT_ARM].forEach((points) => {
      const geometry = new ExtrudeGeometry(
        shapeFromPoints(points),
        extrudeSettings,
      );

      geometry.computeVertexNormals();

      const mesh = new Mesh(
        geometry,
        chromeMaterial,
      );

      mesh.position.z = -extrudeSettings.depth / 2;

      logoGroup.add(mesh);

      geometries.push(geometry);
    });

    const squareGeometry = new ExtrudeGeometry(
      shapeFromPoints(SQUARE),
      squareExtrude,
    );

    squareGeometry.computeVertexNormals();

    const squareMesh = new Mesh(
      squareGeometry,
      chromeMaterial,
    );

    squareMesh.position.z = -squareExtrude.depth / 2;

    logoGroup.add(squareMesh);

    geometries.push(squareGeometry);

    // --------------------------------------------------
    // POSITION
    // --------------------------------------------------

    const updateLogoLayout = () => {
      logoGroup.scale.setScalar(
        responsiveScale(width),
      );

      if (width < 768) {
        logoGroup.position.x = 0;
        logoGroup.position.y = 0;
      } else {
        logoGroup.position.x = 225;
        logoGroup.position.y = 0;
      }
    };

    updateLogoLayout();

    scene.add(logoGroup);

    // --------------------------------------------------
    // CAMERA FIT
    // --------------------------------------------------

    const fitCamera = () => {
      logoGroup.updateMatrixWorld(true);

      const box = new Box3().setFromObject(
        logoGroup,
      );

      const sphere = box.getBoundingSphere(
        new Sphere(),
      );

      const halfFov = MathUtils.degToRad(
        camera.fov * 0.5,
      );

      const distanceForHeight =
        sphere.radius / Math.tan(halfFov);

      const distanceForWidth =
        sphere.radius /
        (Math.tan(halfFov) * camera.aspect);

      const distance =
        Math.max(
          distanceForHeight,
          distanceForWidth,
        ) * 1.42;

      camera.position.z = Math.max(
        1500,
        distance,
      );

      const targetX =
        width < 768 ? 0 : 65;

      camera.lookAt(
        targetX,
        0,
        0,
      );
    };

    fitCamera();

    // --------------------------------------------------
    // LIGHTING
    // --------------------------------------------------

    scene.add(
      new AmbientLight(
        0x1a1418,
        0.65,
      ),
    );

    const keyLight =
      new DirectionalLight(
        0xffffff,
        1.9,
      );

    keyLight.position.set(
      900,
      1400,
      1700,
    );

    scene.add(keyLight);

    const rimLight =
      new PointLight(
        0xffffff,
        2.4,
        6300,
      );

    rimLight.position.set(
      150,
      950,
      -1450,
    );

    scene.add(rimLight);

    const warmLight =
      new PointLight(
        0xff9d00,
        isMobile ? 0.9 : 1.8,
        4900,
      );

    warmLight.position.set(
      -1150,
      450,
      1400,
    );

    scene.add(warmLight);

    const orangeLight =
      new PointLight(
        0xfd7b01,
        isMobile ? 0.8 : 2.1,
        4900,
      );

    orangeLight.position.set(
      1250,
      400,
      850,
    );

    scene.add(orangeLight);

    // --------------------------------------------------
    // INTERACTION
    // --------------------------------------------------

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    let velocityX = 0;
    let velocityY = 0;

    let pointerDown = false;

    let lastPointerX = 0;
    let lastPointerY = 0;

    const setPointerTarget = (
      clientX,
      clientY,
    ) => {
      const rect =
        mount.getBoundingClientRect();

      targetX =
        ((clientX - rect.left) /
          rect.width -
          0.5);

      targetY =
        ((clientY - rect.top) /
          rect.height -
          0.5);
    };

    const onPointerMove = (event) => {
      setPointerTarget(
        event.clientX,
        event.clientY,
      );

      if (!pointerDown) return;

      const deltaX =
        event.clientX - lastPointerX;

      const deltaY =
        event.clientY - lastPointerY;

      velocityY += deltaX * 0.0035;
      velocityX += deltaY * 0.002;

      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
    };

    const onPointerDown = (event) => {
      pointerDown = true;

      lastPointerX = event.clientX;
      lastPointerY = event.clientY;

      renderer.domElement.setPointerCapture?.(
        event.pointerId,
      );

      setPointerTarget(
        event.clientX,
        event.clientY,
      );
    };

    const onPointerUp = (event) => {
      pointerDown = false;

      renderer.domElement.releasePointerCapture?.(
        event.pointerId,
      );
    };

    const onPointerLeave = () => {
      if (!pointerDown) {
        targetX *= 0.7;
        targetY *= 0.7;
      }
    };

    renderer.domElement.addEventListener(
      'pointermove',
      onPointerMove,
    );

    renderer.domElement.addEventListener(
      'pointerdown',
      onPointerDown,
    );

    renderer.domElement.addEventListener(
      'pointerup',
      onPointerUp,
    );

    renderer.domElement.addEventListener(
      'pointercancel',
      onPointerUp,
    );

    renderer.domElement.addEventListener(
      'pointerleave',
      onPointerLeave,
    );

    // --------------------------------------------------
    // ANIMATION
    // --------------------------------------------------

    const clock = new Clock();

    let animationFrame;
    let running = true;

    const animate = () => {
      if (!running) return;

      animationFrame =
        requestAnimationFrame(animate);

      const time =
        clock.getElapsedTime();

      currentX +=
        (targetX - currentX) *
        0.055;

      currentY +=
        (targetY - currentY) *
        0.055;

      velocityX *= 0.92;
      velocityY *= 0.92;

      if (!reducedMotion) {
        logoGroup.rotation.y +=
          velocityY;

        logoGroup.rotation.x +=
          velocityX;

        logoGroup.rotation.y +=
          0.0025;

        logoGroup.rotation.x =
          currentY * 0.32;

        logoGroup.rotation.z =
          currentX * 0.06;

        logoGroup.position.y =
          Math.sin(time * 0.8) *
          3;
      }

      renderer.render(
        scene,
        camera,
      );
    };

    animate();

    // --------------------------------------------------
    // VISIBILITY
    // --------------------------------------------------

    const onVisibilityChange = () => {
      running =
        !document.hidden;

      if (running) {
        clock.start();
        animate();
      } else {
        cancelAnimationFrame(
          animationFrame,
        );
      }
    };

    document.addEventListener(
      'visibilitychange',
      onVisibilityChange,
    );

    // --------------------------------------------------
    // RESIZE
    // --------------------------------------------------

    const resizeObserver =
      new ResizeObserver(() => {
        width =
          mount.clientWidth;

        height =
          mount.clientHeight;

        if (!width || !height) return;

        camera.aspect =
          width / height;

        camera.updateProjectionMatrix();

        renderer.setSize(
          width,
          height,
          false,
        );

        updateLogoLayout();
        fitCamera();
      });

    resizeObserver.observe(mount);

    // --------------------------------------------------
    // CLEANUP
    // --------------------------------------------------

    return () => {
      running = false;

      cancelAnimationFrame(
        animationFrame,
      );

      resizeObserver.disconnect();

      document.removeEventListener(
        'visibilitychange',
        onVisibilityChange,
      );

      renderer.domElement.removeEventListener(
        'pointermove',
        onPointerMove,
      );

      renderer.domElement.removeEventListener(
        'pointerdown',
        onPointerDown,
      );

      renderer.domElement.removeEventListener(
        'pointerup',
        onPointerUp,
      );

      renderer.domElement.removeEventListener(
        'pointercancel',
        onPointerUp,
      );

      renderer.domElement.removeEventListener(
        'pointerleave',
        onPointerLeave,
      );

      geometries.forEach((geometry) => {
        geometry.dispose();
      });

      chromeMaterial.dispose();
      envMap.dispose();

      renderer.dispose();

      if (
        mount.contains(
          renderer.domElement,
        )
      ) {
        mount.removeChild(
          renderer.domElement,
        );
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={className}
      aria-label="Logo 3D da StackByte"
      role="img"
    />
  );
}