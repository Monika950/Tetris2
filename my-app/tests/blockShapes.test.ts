import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';
import { BlockShapes, getRandomBlock } from '../components/blockShapes';

describe("BlockShapes Component", () => {
  it("returns a valid block shape", () => {
    const shape = getRandomBlock();

    const validShapes = Object.values(BlockShapes);

    expect(validShapes).toContainEqual(shape);
  });
});
