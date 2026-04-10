import { useQuery } from '@tanstack/react-query';

export interface CloudData {
  id: number;
  name: string;
  cpu: number;
  ram: number;
  storage: number;
  network: number;
  efficiency: number;
  total: number;
}

export const useCloudExplorer = (level: 'cluster' | 'namespace' | 'poduction') => {
  return useQuery({
    queryKey: ['cloud-data', level],
    queryFn: async (): Promise<CloudData[]> => {
      const res = await fetch('https://dummyjson.com/products?limit=4');
      const json = await res.json();


      return json.products.map((p: any) => ({
        id: p.id,
        name: `${level.toUpperCase()} ${p.brand.split(' ')}`,
        cpu: p.price * 2,
        ram: Math.floor(p.price * 0.8),
        storage: Math.floor(p.discountPercentage * 10),
        network: Math.floor(p.stock / 2),
        efficiency: Math.floor(p.rating * 20),
        total: p.price * 5
      }));
    }
  });
};