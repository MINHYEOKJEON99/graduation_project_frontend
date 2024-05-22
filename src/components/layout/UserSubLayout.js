import style from './UserSubLayout.module.css';

export default function UserSubLayout({ children }) {
  return (
    <div>
      <div className={style.main}>{children}</div>
      <footer className={style.footer}>
        <p>&copy; 2024 mdmService. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <p style={{ margin: 0, fontSize: '12px' }}>
            Image credits: Photo by rawpixel on Freepik
          </p>
          <p style={{ margin: 0, marginBottom: '10px', fontSize: '12px' }}>
            Image credits: Photo by Itim2101 Gradient on FLATICON
          </p>
        </div>
      </footer>
    </div>
  );
}
