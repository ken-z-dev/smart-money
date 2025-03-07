## Scripts

```sh
pnpm run lint
pnpm run format
pnpm run typecheck
```

### Thiết lập

#### Bước 1: Tạo file `.env` và thêm private key

```env
MESO_APTOS_PRIVATE_KEY=""
```

#### Bước 2: Xem APR

Chạy lệnh sau để xem APR:

```sh
ENV=mainnet npx ts-node src/meso/views/apr.demo.ts
```

Kết quả mẫu: 

```
Net APR Difference with incentive for zUSDC: 1.9200% (-2.86%)
```

- **APR có incentive**: 1.92%  
- **APR không có incentive**: -2.86%

#### Bước 3: Unloop USDT

1. Mở file `src/meso/unlooping_fa.ts`.  
2. Điều chỉnh giá trị `n` (số vòng unloop).  
3. Chạy lệnh:

```sh
ENV=mainnet npx ts-node src/meso/unlooping_fa.ts
```