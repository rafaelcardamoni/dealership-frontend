import styles from './styles.module.scss';
import { RiRestartLine } from 'react-icons/ri';

interface ResetInputButtonProps {
  handleCheckboxFilter: (filter: string) => void;
  handleSearchTerm: (text: string) => void;
}

export function ResetInputButton({
  handleCheckboxFilter,
  handleSearchTerm
}: ResetInputButtonProps) {
  function clearFilterInputs() {
    if (typeof window) {
      const inputs = document.querySelectorAll('input');
      inputs.forEach(input => {
        if (input.type === 'text') {
          input.value = '';
        }
        if (input.type === 'radio' || input.type === 'checkbox') {
          input.checked = false;
        }
      });
    }
  }

  return (
    <>
      <button
        className={styles.resetButton}
        onClick={() => {
          handleCheckboxFilter('');
          handleSearchTerm('');
          clearFilterInputs();
        }}
      >
        <RiRestartLine />
        <span>Resetar filtros</span>
      </button>
    </>
  );
}
