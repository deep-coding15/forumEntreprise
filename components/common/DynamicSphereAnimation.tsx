'use client';
import dynamic from "next/dynamic";
export const DynamicSphereAnimation = dynamic(
  () => import("./SphereAnimation"), 
  { ssr: false }
);

export default function SphereAnimationWrapper() {
  return <DynamicSphereAnimation />;
}