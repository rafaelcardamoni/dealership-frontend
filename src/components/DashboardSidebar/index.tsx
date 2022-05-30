import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { CSSTransition } from 'react-transition-group';
import { DropdownMenu } from '../../components/DropdownMenu';
import { DropdownItem } from '../../components/DropdownItem';
import { DashboardNavigation } from '../../components/DashboardNavigation';
import { DashboardNavigationItem } from '../../components/DashboardNavigationItem';
import { IoMdSettings } from 'react-icons/io';
import { BiLogOut, BiUserCircle } from 'react-icons/bi';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { MdManageSearch } from 'react-icons/md';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { RiUserSearchLine } from 'react-icons/ri';
import { Logo } from '../Logo';
import Ripples from 'react-ripples';
import styles from './styles.module.scss';
import { AuthContext } from '../../contexts/AuthContext';

interface DashboardSidebarProps {
  user?: {
    fullname: string;
    email: string;
  };
  setSelected?: Dispatch<SetStateAction<string>>;
}

export function DashboardSidebar({ user, setSelected }: DashboardSidebarProps) {
  const [open, setOpen] = useState(false);
  const { handleLogout } = useContext(AuthContext);
  const ref = useRef<any>();
  const nodeRef = useRef(null);

  useEffect(() => {
    function handleClickOutsideDropdown(e) {
      if (!ref?.current?.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutsideDropdown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideDropdown);
    };
  }, [open]);

  return (
    <>
      <div className={styles.sidebarContainer}>
        <div className={styles.top}>
          <Logo color="white" iconOnly={true} />

          <div className={styles.settings} ref={ref}>
            <Ripples>
              <button
                onClick={e => {
                  if (ref?.current?.contains(e.target) && open === true) {
                    setOpen(false);
                    return;
                  }
                  setOpen(true);
                }}
              >
                <IoMdSettings />
              </button>
            </Ripples>
            <CSSTransition
              in={open}
              timeout={600}
              classNames={{
                enter: styles['fade-enter'],
                enterActive: styles['fade-enter-active'],
                exit: styles['fade-exit'],
                exitActive: styles['fade-exit-active']
              }}
              unmountOnExit
              nodeRef={nodeRef}
            >
              <DropdownMenu>
                <DropdownItem
                  href=""
                  icon={
                    <BiUserCircle
                      style={{ verticalAlign: 'middle', fontSize: '1.3rem' }}
                    />
                  }
                >
                  Perfil
                </DropdownItem>

                <DropdownItem
                  href=""
                  icon={
                    <BiLogOut
                      style={{ verticalAlign: 'middle', fontSize: '1.3rem' }}
                    />
                  }
                  onClick={handleLogout}
                >
                  Sair
                </DropdownItem>
              </DropdownMenu>
            </CSSTransition>
          </div>
        </div>

        <div className={styles.navigation}>
          <DashboardNavigation
            title="Veículos"
            subtitle="Gerenciamento de veículos"
          >
            <DashboardNavigationItem
              href="/dashboard"
              icon={<MdManageSearch />}
              onClick={() => setSelected('allVehicles')}
            >
              Visão geral
            </DashboardNavigationItem>
            <DashboardNavigationItem
              href="/dashboard"
              icon={<IoMdAddCircleOutline />}
              onClick={() => setSelected('addVehicle')}
            >
              Adicionar veículo
            </DashboardNavigationItem>
          </DashboardNavigation>

          <DashboardNavigation
            title="Usuários"
            subtitle="Gerenciamento de usuários"
          >
            <DashboardNavigationItem
              href="/dashboard"
              icon={<RiUserSearchLine />}
              onClick={() => setSelected('allUsers')}
            >
              Lista de usuários
            </DashboardNavigationItem>

            <DashboardNavigationItem
              href="/dashboard"
              icon={<AiOutlineUserAdd />}
              onClick={() => setSelected('addUser')}
            >
              Adicionar usuário
            </DashboardNavigationItem>
          </DashboardNavigation>
        </div>
      </div>
    </>
  );
}
