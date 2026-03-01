import { Test, TestingModule } from '@nestjs/testing';
import { TipoVelaController } from './tipo_vela.controller';
import { TipoVelaService } from './tipo_vela.service';

describe('TipoVelaController', () => {
  let controller: TipoVelaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoVelaController],
      providers: [TipoVelaService],
    }).compile();

    controller = module.get<TipoVelaController>(TipoVelaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
