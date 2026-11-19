import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Truck, ShieldCheck, RefreshCcw } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { Button } from '../components/common/Button';
import { Spinner } from '../components/common/Spinner';
import faqs from '../data/faqs.json';
import { cn } from '../utils/cn';

const FEATURES = [
  { icon: Truck, title: 'Fast shipping', description: 'Same-day dispatch on orders placed before 3 PM.' },
  {
    icon: ShieldCheck,
    title: 'Secure checkout',
    description: 'Your details stay yours — nothing is stored on a server.',
  },
  { icon: RefreshCcw, title: 'Easy returns', description: '30 days to change your mind, no questions asked.' },
];

// Colocated here rather than given its own file in components/ — it's a
// small piece of UI that only ever appears inside this page's FAQ section,
// so a separate file would just add an extra hop with no real reuse payoff.
function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-border py-4">
      <button onClick={onToggle} className="flex w-full items-center justify-between text-left">
        <span className="font-medium text-ink">{faq.question}</span>
        <ChevronDown size={18} className={cn('text-ink-muted transition-transform', isOpen && 'rotate-180')} />
      </button>
      {isOpen && <p className="mt-2 text-sm text-ink-muted">{faq.answer}</p>}
    </div>
  );
}

export default function HomePage() {
  const { data: categories, isLoading } = useFetch('/products/categories');

  // Storing the OPEN id, not a boolean per item, means opening one FAQ
  // automatically closes whichever other one was open — no extra logic
  // needed, it falls out of how the comparison works.
  const [openFaqId, setOpenFaqId] = useState(null);
  const thirdFeature = FEATURES[2];

  return (
    <div>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-dark">
              New arrivals every week
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Everything you need, packed in one crate.
            </h1>
            <p className="mt-4 max-w-md text-ink-muted">
              Electronics, apparel, and jewelry — sourced and organized in one straightforward storefront.
            </p>
            <div className="mt-6">
              <Link to="/products">
                <Button size="lg">Browse products</Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {FEATURES.slice(0, 2).map((feature) => (
              <div key={feature.title} className="rounded-lg border border-border bg-paper p-5">
                <feature.icon className="text-accent" size={22} />
                <p className="mt-3 font-medium text-ink">{feature.title}</p>
                <p className="mt-1 text-sm text-ink-muted">{feature.description}</p>
              </div>
            ))}
            <div className="col-span-2 rounded-lg border border-border bg-paper p-5">
              <thirdFeature.icon className="text-accent" size={22} />
              <p className="mt-3 font-medium text-ink">{thirdFeature.title}</p>
              <p className="mt-1 text-sm text-ink-muted">{thirdFeature.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-2xl font-semibold text-ink">Shop by category</h2>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size={28} />
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {categories?.map((category) => (
              <Link
                key={category}
                to={`/products?category=${encodeURIComponent(category)}`}
                className="rounded-lg border border-border bg-surface p-6 text-center capitalize text-ink transition-colors hover:border-accent hover:text-accent"
              >
                {category}
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="font-display text-2xl font-semibold text-ink">Frequently asked questions</h2>
        <div className="mt-4">
          {faqs.map((faq) => (
            <FaqItem
              key={faq.id}
              faq={faq}
              isOpen={openFaqId === faq.id}
              onToggle={() => setOpenFaqId((current) => (current === faq.id ? null : faq.id))}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
