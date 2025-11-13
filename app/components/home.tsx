import { ProfilePicture } from './profile-picture';

export function Home() {
  return (
    <div>
      <div className="grid grid-flow-row md:grid-flow-col gap-6 lg:gap-14 justify-items-center items-center">
        <div className="my-auto profile-picture w-60 h-60">
          <ProfilePicture className="rounded-full shadow-2xl" />
        </div>
        <div>
          <h2>Hey there, I&apos;m Christian!</h2>
          <p className="text-lg">
            As a consultant and software engineer, I have a strong passion for web technologies and
            throughout my career, I have had the opportunity to work across different industries. I
            have a strong understanding of both front-end and back-end development and enjoy
            tackling new challenges with emerging technologies. My approach is centered around agile
            methodologies and a user-centric mindset, with a focus on creating simple, clean and
            intuitive user interfaces. I believe that user experience design is a crucial aspect of
            the development process, which is why I prioritize understanding the needs of the users
            to deliver effective solutions.
          </p>
          <p className="text-lg">
            You want to know more?{' '}
            <a href="mailto:christian@mcfadden.at" className="font-semibold">
              Get in touch with me!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
