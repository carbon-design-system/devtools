function isManifestV3() {
  return Boolean(self.WorkerGlobalScope);
}

export { isManifestV3 };
