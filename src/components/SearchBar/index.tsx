import styles from './styles.module.scss';

interface SearchBarProps {
  handleSearchTerm: (text) => void;
}

export function SearchBar({ handleSearchTerm }: SearchBarProps) {
  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        placeholder="Pesquise por modelo, marca, versão, cor..."
        onChange={event => {
          handleSearchTerm(event.target.value.toLowerCase());
        }}
      />
    </div>
  );
}
