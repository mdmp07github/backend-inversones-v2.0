import { Test, TestingModule } from '@nestjs/testing';
import { TipoVelaService } from './tipo_vela.service';

describe('TipoVelaService', () => {
  let service: TipoVelaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoVelaService],
    }).compile();

    service = module.get<TipoVelaService>(TipoVelaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
