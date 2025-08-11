import Link from 'next/link';
import Image from 'next/image';

type Props = {
  href: string;
  title: string;
  description: string;
  image: string;
};

export default function CategoryCard({ href, title, description, image }: Props) {
  return (
    <Link href={href} className="card p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 min-h-[48px] w-full" aria-label={title}>
      <div className="aspect-[4/3] rounded-xl overflow-hidden border border-gray-100">
        <Image
          src={image}
          alt={title}
          width={400}
          height={300}
          className="w-full h-full object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 400px"
        />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </Link>
  );
}


