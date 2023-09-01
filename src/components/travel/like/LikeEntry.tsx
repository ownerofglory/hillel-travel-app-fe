import { LikeEntryProps } from "../../../props/likeEntryProps";
import './like-style.css'
export const LikeEntry: React.FC<LikeEntryProps> = ({user}) => {
    return (
        <p className={'like-entry'}>
            <img src={`https://randomuser.me/api/portraits/thumb/${Math.floor(Math.random() * 100) % 2  == 0 ? 'men': 'women'}/${Math.floor(Math.random() * 100)}.jpg`} />
            <span>{user.name}</span>
        </p>
    );
};