import styles from './styles.module.scss';

export function DashboardAllUsers({ users }) {
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Data da inserção</th>
          </tr>
        </thead>

        <tbody>
          {users?.map(user => {
            return (
              <tr key={user.id}>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>
                  {new Intl.DateTimeFormat('pt-BR').format(
                    new Date(user.created_at)
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
