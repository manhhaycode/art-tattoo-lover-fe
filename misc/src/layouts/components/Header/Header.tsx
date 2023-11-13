import { useWindowSize } from 'react-use';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';

export default function Header() {
    const { width } = useWindowSize();
    return width > 580 ? <HeaderDesktop /> : <HeaderMobile />;
}
