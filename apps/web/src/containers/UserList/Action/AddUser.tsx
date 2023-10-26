import { useTranslation } from 'react-i18next';

interface IAddUser {
  onAdd: () => void;
}

function AddUser({ onAdd }: IAddUser): JSX.Element | null {
  const { t } = useTranslation();
  return (
    <div className="flex w-full justify-end">
      <button
        className="m-4 mb-2 rounded-md px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-white"
        onClick={onAdd}
        type="submit">
        {t('nested.key')}
      </button>
    </div>
  );
}

export default AddUser;
