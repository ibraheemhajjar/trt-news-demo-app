export const calculatePublishTime = (dateString) => {
     const dateOfPublish = new Date(dateString).getTime();
     const dateNow = new Date().getTime();
     const differenceInSeconds = (dateNow - dateOfPublish) / 1000;

     switch (true) {
          case (differenceInSeconds >= 0 && differenceInSeconds < 60):
               return `${Math.floor(differenceInSeconds)} seconds ago`.toUpperCase();

          case (differenceInSeconds >= 60 && differenceInSeconds < 120):
               return "a minute ago".toUpperCase();

          case (differenceInSeconds >= 120 && differenceInSeconds < 3_600):
               return `${Math.floor(differenceInSeconds / 60)} minutes ago`.toUpperCase();

          case (differenceInSeconds >= 3_600 && differenceInSeconds < 7_200):
               return "an hour ago".toUpperCase();

          case (differenceInSeconds >= 7_200 && differenceInSeconds < 86_400):
               return `${Math.floor(differenceInSeconds / 3600)} hours ago`.toUpperCase();

          case (differenceInSeconds >= 86_400 && differenceInSeconds < 172_800):
               return "a day ago".toUpperCase();

          case (differenceInSeconds >= 172_800 && differenceInSeconds < 604_800):
               return `${Math.floor(differenceInSeconds / 86_400)} days ago`.toUpperCase();

          case (differenceInSeconds >= 604_800 && differenceInSeconds < 1_209_600):
               return "a week ago".toUpperCase();

          case (differenceInSeconds >= 1_209_600 && differenceInSeconds < 2_592_000):
               return `${Math.floor(differenceInSeconds / 604_800)} weeks ago`.toUpperCase();

          case (differenceInSeconds >= 2_592_000 && differenceInSeconds < 5_184_000):
               return "a month ago".toUpperCase();

          case (differenceInSeconds >= 5_184_000 && differenceInSeconds < 31_104_000):
               return `${Math.floor(differenceInSeconds / 2_592_000)} months ago`.toUpperCase();

          case (differenceInSeconds >= 31_104_000 && differenceInSeconds < 62_208_000):
               return "a year ago".toUpperCase();

          case (differenceInSeconds > 62_208_000):
               return `${Math.floor(differenceInSeconds / 31_104_000)} years ago`.toUpperCase();

          default:
               return new Date(dateString).toDateString();
     }
};
