# Supported 3D Model Formats

The 3D Product Gallery now supports multiple 3D model formats:

## Supported Formats

### ✅ GLB (GL Transmission Format Binary)
- **Extension:** `.glb`
- **Best for:** Web delivery, optimized file size
- **Features:** Includes textures, animations, materials
- **Recommended:** Yes - Best performance and compatibility

### ✅ GLTF (GL Transmission Format)
- **Extension:** `.gltf`
- **Best for:** Editable format with separate texture files
- **Features:** JSON-based, human-readable
- **Note:** May require separate texture files

### ✅ OBJ (Wavefront Object)
- **Extension:** `.obj`
- **Best for:** Simple geometry without animations
- **Features:** Widely supported, simple format
- **Note:** Requires separate `.mtl` file for materials and textures

### ✅ FBX (Filmbox)
- **Extension:** `.fbx`
- **Best for:** Complex models with animations from 3D software
- **Features:** Supports animations, materials, textures
- **Note:** Larger file sizes

### ⚠️ BLEND (Blender)
- **Extension:** `.blend`
- **Status:** Not directly supported in browser
- **Solution:** Export from Blender as GLB/GLTF format
- **Recommendation:** Use Blender's built-in GLB exporter

## Usage Example

```javascript
// In your API route (app/api/models/route.ts)
const models = [
  {
    id: 1,
    name: 'My Model',
    description: 'Description',
    modelUrl: '/3d-models/model.glb',  // GLB format
    format: 'glb',
    height: '100vh'
  },
  {
    id: 2,
    name: 'OBJ Model',
    description: 'Description',
    modelUrl: '/3d-models/model.obj',  // OBJ format
    format: 'obj',
    textureUrl: '/3d-models/texture.jpg',  // Optional texture
    height: '100vh'
  }
];
```

## File Placement

Place your 3D model files in the `public/3d-models/` directory:

```
public/
  └── 3d-models/
      ├── model1.glb
      ├── model2.obj
      ├── model2.mtl
      ├── model3.fbx
      └── textures/
          ├── texture1.jpg
          └── texture2.png
```

## Best Practices

1. **Use GLB for production** - Best performance and compatibility
2. **Optimize file sizes** - Compress textures and reduce polygon count
3. **Test locally first** - Verify models load correctly before deployment
4. **Include fallbacks** - Always have a backup model in case of loading failures

## Converting BLEND to GLB

If you have `.blend` files from Blender:

1. Open the file in Blender
2. Go to `File > Export > glTF 2.0 (.glb/.gltf)`
3. Choose GLB format
4. Export and use the resulting `.glb` file

## Error Handling

The viewer automatically handles loading errors gracefully:
- Failed models won't break the site
- Error messages are logged to console
- Section remains visible with title and description
