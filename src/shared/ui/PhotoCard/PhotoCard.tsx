import style from './PhotoCard.module.css';

type PhotoCardProps = {
	src: string;
	alt?: string;
};

export const PhotoCard = ({ src, alt }: PhotoCardProps) => {
	return (
		<div className={style.photoContent}>
			<img src={src} alt={alt} />
		</div>
	);
};
