import favicon from '@/assets/favicon.png';

const iconModules = import.meta.glob<{ default: ImageMetadata }>('/src/assets/icons/*.{png,svg,jpg,jpeg}', { eager: true });
const iconMap = Object.fromEntries(
	Object.entries(iconModules).map(([filePath, module]) => {
		const key = filePath.split('/').at(-1)?.replace(/\.(png|svg|jpg|jpeg)$/, '') ?? '';
		return [key, module.default];
	})
);

function getIcon(key: string) {
    return iconMap[key] ?? favicon;
}

export { getIcon, favicon };