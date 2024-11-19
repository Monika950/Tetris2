import { vi, expect, it, describe } from 'vitest';
import { openFile, closeFile, getGames } from '../api/file'; 


global.fetch = vi.fn() as unknown as ReturnType<typeof vi.fn>;

describe('openFile function', () => {
  
    it('should log the message when the fetch request is successful', async () => {
    const mockResponse = { message: 'File opened successfully!' };

    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    const logSpy = vi.spyOn(console, 'log');

    await openFile();

    expect(logSpy).toHaveBeenCalledWith(mockResponse.message);
 
    logSpy.mockRestore();
  });

  it('should handle errors and log the error message when fetch fails', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network Error'));

    const errorSpy = vi.spyOn(console, 'error');

    await openFile();

    expect(errorSpy).toHaveBeenCalledWith('Error:', new Error('Network Error'));

    errorSpy.mockRestore();
  });

  it('should handle a non-200 status code', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: vi.fn().mockResolvedValueOnce('Internal Server Error'),
    });
  
    const errorSpy = vi.spyOn(console, 'error');
  
    await openFile();
  
    expect(errorSpy).toHaveBeenCalledWith('Error:', expect.any(Error));
    errorSpy.mockRestore();
  });
});


describe('closeFile function', () => {

    it('should log the message when the fetch request is successful', async () => {
      const mockResponse = { message: 'File closed successfully!' };
      (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        json: vi.fn().mockResolvedValueOnce(mockResponse),
      });
  
      const logSpy = vi.spyOn(console, 'log');

      await closeFile();
  
      expect(logSpy).toHaveBeenCalledWith(mockResponse.message);
  
      logSpy.mockRestore();
    });
  
    it('should handle errors and log the error message when fetch fails', async () => {
      (fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network Error'));
  
      const errorSpy = vi.spyOn(console, 'error');

      await closeFile();
  
      expect(errorSpy).toHaveBeenCalledWith('Error:', new Error('Network Error'));
  
      errorSpy.mockRestore();
    });
  });

  describe('getGames function', () => {
    it('should return the list of games when the fetch request is successful', async () => {
      const mockResponse = { files: ['1730292166471', '1731074936785', '1731078781333'] };
      (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValueOnce(mockResponse),
      });
  
      const logSpy = vi.spyOn(console, 'log');
  
      const result = await getGames();
  
      expect(logSpy).toHaveBeenCalledWith('Games:', mockResponse.files);
  
      expect(result).toEqual(mockResponse.files);
  
      logSpy.mockRestore();
    });
  
    it('should throw an error and log it when the response is not OK', async () => {
      (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        json: vi.fn(),
      });
  
      const errorSpy = vi.spyOn(console, 'error');
  
      const result = await getGames();
  
      expect(errorSpy).toHaveBeenCalledWith('Error:', new Error('Failed to fetch games'));

      expect(result).toBeUndefined();
  
      errorSpy.mockRestore();
    });
  
    it('should handle network errors and log them', async () => {
      (fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network Error'));
  
      const errorSpy = vi.spyOn(console, 'error');
  
      const result = await getGames();
  
      expect(errorSpy).toHaveBeenCalledWith('Error:', new Error('Network Error'));
  
      expect(result).toBeUndefined();
  
      errorSpy.mockRestore();
    });
  });