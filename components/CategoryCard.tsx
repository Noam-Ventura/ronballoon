import Link from 'next/link';

type Props = {
  href: string;
  title: string;
  description: string;
};

export default function CategoryCard({ href, title, description }: Props) {
  return (
    <Link href={href} className="card p-6 flex flex-col gap-2" aria-label={title}>
      <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-white to-brand-50 border border-gray-100" aria-hidden="true" />
      <div>
        <h3 className="text-lg">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </Link>
  );
}


