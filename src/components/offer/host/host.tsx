import cn from 'classnames';
import { memo } from 'react';

type TProps = {
  avatarUrl: string;
  name: string;
  isPro: boolean;
  description: string;
}

const Host = ({ avatarUrl, name, isPro, description }: TProps) => (
  <div className="offer__host">
    <h2 className="offer__host-title">Meet the host</h2>
    <div className="offer__host-user user">
      <div className={cn([
        'offer__avatar-wrapper',
        isPro ? 'offer__avatar-wrapper--pro' : '',
        'user__avatar-wrapper'
      ])}
      >
        <img
          className="offer__avatar user__avatar"
          src={avatarUrl}
          width="74"
          height="74"
          alt="Host avatar"
        />
      </div>
      <span className="offer__user-name">
        {name}
      </span>
      {isPro && (
        <span className="offer__user-status">
          Pro
        </span>
      )}
    </div>
    <div className="offer__description">
      <p className="offer__text">
        {description}
      </p>
    </div>
  </div>
);

const MemoizedHost = memo(Host);

export default MemoizedHost;
