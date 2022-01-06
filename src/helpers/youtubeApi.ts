export type YouTubeDataVideo = {
  items: [
    {
      id: string;
      snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        tags: string[];
        categoryId: number;
        defaultLanguage: string;
      };
      contentDetails: {
        duration: string;
        dimension: string;
        definition: string;
        projection: string;
      };
      status: {
        privacyStatus: string;
        license: string;
        madeForKids: boolean;
      };
      statistics: {
        viewCount: number;
        likeCount: number;
        commentCount: number;
      };
    }
  ];
};

export type YouTubeDataChannel = {
  items: [
    {
      id: string;
      snippet: {
        title: string;
        description: string;
        customUrl: string;
        publishedAt: string;
        thumbnails: [high: { url: string }];
        country: string;
      };
      statistics: {
        viewCount: number;
        subscriberCount: number;
        videoCount: number;
      };
    }
  ];
};
