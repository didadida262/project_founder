import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// 虚拟人脸模型组件
const FaceModel = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previousPosition, setPreviousPosition] = useState({ x: 0, y: 0 });

  // 加载人脸模型 - 这里使用一个简单的球体作为示例
  // 实际项目中你可以替换为真实的人脸GLTF模型
  // const { nodes, materials } = useGLTF('/path/to/face-model.gltf');

  useFrame(() => {
    // 这里可以添加动画逻辑
  });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setIsDragging(true);
    setPreviousPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handlePointerMove = (e: any) => {
    if (isDragging && groupRef.current) {
      const deltaX = e.clientX - previousPosition.x;
      const deltaY = e.clientY - previousPosition.y;

      groupRef.current.rotation.y += deltaX * 0.01;
      groupRef.current.rotation.x += deltaY * 0.01;

      setPreviousPosition({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* 简单球体作为人脸 - 实际项目替换为真实模型 */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#f0c0a0" />
      </mesh>

      {/* 眼睛 */}
      <mesh position={[0.3, 0.2, 0.9]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[-0.3, 0.2, 0.9]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#000" />
      </mesh>

      {/* 嘴巴 */}
      <mesh position={[0, -0.2, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.3, 0.05, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#c06" />
      </mesh>
    </group>
  );
};

// 主场景组件
const VirtualFaceScene = () => {
  return (
    <div className="w-full h-screen bg-black relative">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        onCreated={({ scene }) => {
          scene.background = new THREE.Color(0x000000);
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FaceModel />
        {/* 禁用默认的OrbitControls，因为我们自定义了交互 */}
        {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
      </Canvas>

      <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
        点击并拖动鼠标旋转面部
      </div>
    </div>
  );
};

export default VirtualFaceScene;
