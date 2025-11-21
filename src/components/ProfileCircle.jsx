import "./ProfileCircle.css"

const ProfileCircle = ({loginResData, handleClick, activeProfile}) => {


  return (
    <div className="profile-container">
      {loginResData &&
        loginResData.result.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(item.id)}
            className={`profile-circle ${activeProfile.includes(item.id) ? "active" : ""}`}
            style={{
              backgroundImage: `url(/images/profile_${item.img}.jpg)`,
            }}
          ></div>
        ))}
    </div>
  );
};

export default ProfileCircle;
