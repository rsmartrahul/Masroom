import EnquiryForm from '@/components/EnquiryForm';

type EnquiryPageProps = {
  searchParams?: Promise<{
    product?: string;
    service?: string;
    plan?: string;
  }>;
};

export default async function EnquiryPage({ searchParams }: EnquiryPageProps) {
  const params = searchParams ? await searchParams : undefined;

  return (
    <EnquiryForm
      initialProduct={params?.product}
      initialService={params?.service}
      initialPlan={params?.plan}
    />
  );
}
