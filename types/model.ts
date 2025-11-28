export interface ModelData {
  id: number;
  name: string;
  description: string;
  instruction: string;
  modelUrl: string;
  height: string;
  format?: 'glb' | 'gltf' | 'obj' | 'fbx' | 'blend';
  textureUrl?: string;
}
