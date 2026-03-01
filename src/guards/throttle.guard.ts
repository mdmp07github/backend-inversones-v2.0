import {
    Injectable,
    ExecutionContext,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import {
    ThrottlerGuard,
    ThrottlerLimitDetail,
} from '@nestjs/throttler';

@Injectable()
export class ThrottlerCustomGuard extends ThrottlerGuard {
    protected async throwThrottlingException(
        context: ExecutionContext,
        throttlerLimitDetail: ThrottlerLimitDetail,
    ): Promise<void> {
        throw new HttpException(
            {
                message: ['Has excedido el límite de solicitudes. Intenta nuevamente en unos minutos.'],
                error: 'Demasiadas solicitudes',
                statusCode: HttpStatus.TOO_MANY_REQUESTS,
            },
            HttpStatus.TOO_MANY_REQUESTS,
        );
    }
}