import { post } from '../request';

export async function sendInvite(params = {}) {
  const url = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth';
  const res = await post(url, params);
  return res;
}

export function test() {}
