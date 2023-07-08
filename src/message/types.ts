export type PostResponse = {
  ok: boolean;
  result: {
    message_id: number;
    from: {
      id: number;
      is_bot: boolean;
      first_name: string;
      username: string;
    };
    chat: {
      first_name: string;
      username: string;
      type: string;
    };
    date: number;
    text: string;
  };
};
