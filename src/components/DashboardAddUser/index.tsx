import { Form } from '@unform/web';
import { useRouter } from 'next/router';
import { clientSideApi } from '../../services/clientSideApi';
import { Button } from '../Button';
import { Input } from '../Form/Input';
import styles from './styles.module.scss';

export function DashboardAddUser() {
  const router = useRouter();

  function handleSubmit(data) {
    clientSideApi
      .post('/api/users/create', {
        fullname: data.fullname,
        email: data.email,
        password: data.password,
        admin: false
      })
      .then(response => {
        console.log(response);
        router.reload();
      })
      .catch(error => console.log(error));
  }

  return (
    <div className={styles.container}>
      <h2>Informações do usuário</h2>
      <Form onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <label htmlFor="fullname">Nome Completo</label>
          <Input name="fullname" required />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="email">E-mail</label>
          <Input name="email" type="email" required />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="password">Senha</label>
          <Input name="password" type="password" required />
        </div>

        <div className={styles.buttons}>
          <Button
            hoverColorClass="textColorFilter"
            type="submit"
            text="Adicionar"
            backgroundColor="var(--sidebar)"
            shape="var(--rounded-3xl)"
            height="23px"
            width="150px"
            textAlign="center"
          />
        </div>
      </Form>
    </div>
  );
}
