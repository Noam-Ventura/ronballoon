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
    <Link href={href} className="card p-6 flex flex-col gap-2" aria-label={title}>
      <div className="aspect-[4/3] rounded-xl overflow-hidden border border-gray-100">
        <Image
          src={image}
          alt={title}
          width={400}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h3 className="text-lg">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </Link>
  );
}


