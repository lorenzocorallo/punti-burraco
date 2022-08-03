const Wrapper = ({ children }: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div className="text-center max-h-screen overflow-y-scroll overflow-x-hidden relative flex flex-col h-full items-center justify-start pb-6">
			{children}
		</div>
	);
};

export default Wrapper;
