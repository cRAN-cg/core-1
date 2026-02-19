import fs from 'fs';
import path from 'path';

export interface DownloadOptions {
    /**
     * URL of the file.
     */
  url: string;

  /**
     * Path to where the file will be saved.
     */
  destination: string;

  /**
     * Name of the file.
     */
  filename: string;
}

/**
 * Downloads a file from a URL and saves it to disk.
 * Uses the native fetch API for compatibility with Node.js 18+, Bun, and other runtimes.
 *
 * @param options Download options.
 */
export default async function download(options: DownloadOptions) {
    const { url, destination, filename } = options;

  const response = await fetch(url);

  if (!response.ok) {
        throw new Error(
                `Error ${response.status}. Failed to fetch types for URL: ${url}`,
              );
  }

  const fileDest = path.normalize(path.join(destination, filename));

  // Create the dir path. This doesn't do anything if dir already exists.
  await fs.promises.mkdir(path.dirname(fileDest), {
        recursive: true,
  });

  const buffer = Buffer.from(await response.arrayBuffer());
    await fs.promises.writeFile(fileDest, buffer);
}
