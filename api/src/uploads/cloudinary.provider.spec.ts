import { CloudinaryProvider } from './cloudinary.provider';
import { v2 as cloudinary } from 'cloudinary';

jest.mock('cloudinary');

describe('CloudinaryProvider', () => {
  it('should configure and return cloudinary', () => {
    process.env.CLOUDINARY_CLOUD_NAME = 'test';
    process.env.CLOUDINARY_API_KEY = 'key';
    process.env.CLOUDINARY_API_SECRET = 'secret';

    (cloudinary.config as jest.Mock).mockReturnValue({ cloud_name: 'test' });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const providerValue = (CloudinaryProvider.useFactory as any)();

    expect(cloudinary.config).toHaveBeenCalledWith({
      cloud_name: 'test',
      api_key: 'key',
      api_secret: 'secret',
    });
    expect(providerValue).toBeDefined();
  });
});
