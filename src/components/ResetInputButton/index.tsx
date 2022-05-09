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
        onClick={() => {
          handleCheckboxFilter('');
          handleSearchTerm('');
          clearFilterInputs();
        }}
      >
        Resetar filtros
      </button>
    </>
  );
}
