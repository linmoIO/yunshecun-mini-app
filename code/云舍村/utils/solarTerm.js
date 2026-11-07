// 按公历月日找出当前所处的节气：取日期不晚于今天的最后一个节气，年初（小寒之前）沿用上一年的冬至。
// terms 为 CMS solar_terms 中的条目，type=term 表示节气（date 为 MM-DD），type=festival 为农历节日。
function findCurrentTerm(terms, today = new Date()) {
  const solar = (terms || []).filter(t => t.type === 'term' && t.date);
  if (!solar.length) return { current: null, next: null };
  const mmdd = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  let index = solar.length - 1;
  solar.forEach((t, i) => { if (t.date <= mmdd) index = i; });
  return { current: solar[index], next: solar[(index + 1) % solar.length] };
}

module.exports = { findCurrentTerm };
