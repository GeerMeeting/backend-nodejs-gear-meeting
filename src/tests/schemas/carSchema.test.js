import {
  describe, expect, it
} from '@jest/globals';
import Car from '../../schemas/carSchema.js';

describe('Teste do esquema do modelo Car', () => {
  const newCar = {
    model: 'Model X',
    brand: 'Tesla',
    description: 'Electric car',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  it('deve passar na validação com dados válidos', async () => {
    const validCar = new Car(newCar);

    expect(validCar).toEqual(
      expect.objectContaining(newCar),
    );
  });
});
