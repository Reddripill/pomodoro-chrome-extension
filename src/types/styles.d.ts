declare module "*.scss" {
	const content: { [className: string]: string };
	export = content;
}

interface ServiceWorkerGlobalScope extends WorkerGlobalScope {
}