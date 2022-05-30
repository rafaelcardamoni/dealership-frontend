import { Form } from '@unform/web';
import { useRef } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Form/Input';
import { Textarea } from '../../components/Form/Textarea';
import * as Yup from 'yup';
import styles from '../../styles/contactUs.module.scss';

export default function Contact() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        firstName: Yup.string().required('O nome é obrigatório'),
        lastName: Yup.string().required('O sobrenome é obrigatório'),
        email: Yup.string().required('O e-mail é obrigatório'),
        phone: Yup.string().required('O telefone é obrigatório'),
        message: Yup.string().required('A mensagem é obrigatória')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      formRef.current.setErrors({});
      formRef.current.reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Entre em contato conosco</h1>

        <Form onSubmit={handleSubmit} ref={formRef}>
          <div className={styles.firstSection}>
            <div className={styles.inputWrapper} id={styles.firstName}>
              <label htmlFor="firstName">Nome</label>
              <Input name="firstName" />
            </div>
            <div className={styles.inputWrapper} id={styles.lastName}>
              <label htmlFor="lastName">Sobrenome</label>
              <Input name="lastName" />
            </div>
          </div>

          <div className={styles.firstSection}>
            <div className={styles.inputWrapper} id={styles.email}>
              <label htmlFor="email">E-mail</label>
              <Input name="email" />
            </div>
            <div className={styles.inputWrapper} id={styles.phone}>
              <label htmlFor="phone">Celular</label>
              <Input name="phone" />
            </div>
          </div>
          <div className={styles.inputWrapper} id={styles.message}>
            <label htmlFor="message">Mensagem</label>
            <Textarea name="message" />
          </div>

          <div className={styles.inputWrapper}>
            <Button
              text="Enviar"
              width="100%"
              hoverColorClass="textColorFilter"
              textAlign="center"
              padding=".7rem 0"
            />
          </div>
        </Form>
      </div>
    </div>
  );
}
