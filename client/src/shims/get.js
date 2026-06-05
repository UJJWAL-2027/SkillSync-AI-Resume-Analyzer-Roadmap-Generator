export default function get(object, path, defaultValue) {
  if (object == null) return defaultValue;
  
  const pathArray = Array.isArray(path)
    ? path
    : path.toString().split(/[\.\[\]]+/).filter(Boolean);
    
  let current = object;
  for (const key of pathArray) {
    if (current == null) return defaultValue;
    current = current[key];
  }
  
  return current === undefined ? defaultValue : current;
}
