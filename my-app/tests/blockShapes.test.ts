import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { BlockShapes, getRandomBlock } from '../components/blockShapes';

beforeAll(() => {
  vi.spyOn(Math, 'random')
})

afterAll(() => {
  vi.restoreAllMocks()
})

describe("BlockShapes Component", () => {
  it("returns a valid block shape", () => {

    // const shape = getRandomBlock();

    // const validShapes = Object.values(BlockShapes);

    // expect(validShapes).toContainEqual(shape);

    vi.mocked(Math.random).mockReturnValue(1);
    expect(getRandomBlock()).toEqual(BlockShapes.Z);
    vi.mocked(Math.random).mockReturnValue(2);
    expect(getRandomBlock()).toEqual(BlockShapes.J);

  });
});
