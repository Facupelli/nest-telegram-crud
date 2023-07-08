export interface PostResponse {
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
}

export interface UpdateResponse {
  ok: true;
  result: {
    message_id: number;
    from: {
      id: number;
      is_bot: true;
      first_name: string;
      username: string;
    };
    chat: {
      id: number;
      first_name: string;
      username: string;
      type: string;
    };
    date: number;
    edit_date: number;
    text: string;
  };
}
