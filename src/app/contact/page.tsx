export default function Contact() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex-1 flex items-center justify-center pt-2">
      <div className="flex flex-col items-center text-center gap-4 lg:max-w-[50%] mx-auto">
        <div>
          <h2 className="text-xl font-bold">
            For general inquiries, please email
          </h2>
          <p className="text-xl">chairperson@tigermag.com</p>
        </div>
        <div>
          <h2 className="text-xl font-bold">
            For business inquiries, please email
          </h2>
          <p className="text-xl">business@tigermag.com</p>
        </div>
      </div>
    </div>
  );
}
