import ReactPlayer from 'react-player';
import Modal from '../UI/Modal';

export default function Video({ video, onToggle, ratio }) {
  return (
    <Modal onHide={onToggle}>
      <ReactPlayer
        style={{ paddingBottom: '8px' }}
        url={video}
        width={'100%'}
        height={'45%'}
        controls={true}
        playing={true}
        muted={true}
      />
      <div style={{ textAlign: 'center', fontSize: '40px' }}>
        <p>{ratio.slice(10, 15) || ''}</p>
      </div>
    </Modal>
  );
}
