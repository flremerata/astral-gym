// Reusable member card component

export function createMemberCard(member) {
  const statusClass = member.status === 'Active' ? 'badge-active' : 
                      member.status === 'Expiring' ? 'badge-expiring' : 'badge-expired';
  const planClass = member.plan === 'Basic' ? 'badge-basic' : 
                    member.plan === 'Premium' ? 'badge-premium' : 'badge-vip';

  return `
    <div class="member-cell">
      <div class="member-avatar" style="background:${member.color}">${member.avatar}</div>
      <div>
        <div style="font-weight:600">${member.name}</div>
        <div style="font-size:11px;color:var(--muted)">${member.id}</div>
      </div>
    </div>
    <span class="badge ${planClass}">${member.plan}</span>
    <span class="badge ${statusClass}">${member.status}</span>
  `;
}

export function createMemberTableRow(member) {
  const statusClass = member.status === 'Active' ? 'badge-active' : 
                      member.status === 'Expiring' ? 'badge-expiring' : 'badge-expired';
  const planClass = member.plan === 'Basic' ? 'badge-basic' : 
                    member.plan === 'Premium' ? 'badge-premium' : 'badge-vip';
  const barColor = member.att >= 60 ? '' : member.att >= 40 ? 'blue' : 'red';

  return `<tr>
    <td><div class="member-cell"><div class="member-avatar" style="background:${member.color}">${member.avatar}</div><div><div style="font-weight:600">${member.name}</div><div style="font-size:11px;color:var(--muted)">${member.id}</div></div></div></td>
    <td><span class="badge ${planClass}">${member.plan}</span></td>
    <td><span class="badge ${statusClass}">${member.status}</span></td>
    <td style="font-family:'Space Mono',monospace;font-size:11px;color:var(--muted)">${member.phone}</td>
    <td style="font-size:11px;color:var(--muted)">${member.joined}</td>
    <td style="font-family:'Space Mono',monospace;font-size:11px;${member.status==='Expiring'?'color:var(--accent2)':''}">${member.expiry}</td>
    <td><div style="display:flex;align-items:center;gap:8px"><div class="progress-bar" style="width:70px;flex:none"><div class="progress-fill ${barColor}" style="width:${member.att}%"></div></div><span style="font-size:11px;color:var(--muted)">${member.att}%</span></div></td>
    <td style="display:flex;gap:4px;padding:8px 16px">
      <button class="btn btn-ghost btn-sm" onclick="viewMember('${member.name}')">View</button>
      <button class="btn btn-danger btn-sm" onclick="showToast('Edit member opened','success')">Edit</button>
    </td>
  </tr>`;
}
