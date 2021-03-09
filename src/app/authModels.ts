export interface accessTokenResponce {
    account_id: string,
    access_token: string,
    success: boolean,
    status_message: string,
    status_code: number
}

export interface requestTokenResponce {
    status_message: string,
    request_token: string ,
    success: boolean,
    status_code: number
  }