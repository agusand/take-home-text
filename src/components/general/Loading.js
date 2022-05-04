import spinner from '../../assets/icons/spinner.svg';

export default function Loading() {
	return (
		<div className="loading">
			<figure className="loading__figure">
				<img className="loading__image" alt="cargando" src={spinner} />
			</figure>
		</div>
	);
};