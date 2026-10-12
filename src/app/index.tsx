import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

/* =====================================================
   CHỈ CODE 2 MÀN HÌNH:
   1) Home  = Chi tiết công việc
   2) Wallet = Doanh thu (Dashboard)
   Các tab còn lại (chat, đã lưu, cá nhân) KHÔNG code.
   ===================================================== */

const COLORS = {
  green: '#2E9E00',
  greenBtn: '#C8F59A',
  greenBorder: '#9ADB5A',
  greenText: '#2B6A00',
  urgentBg: '#FFD6D6',
  urgentText: '#D40000',
  gray: '#8A8A8A',
  line: '#E6E6E6',
  star: '#F5A623',
  blue: '#3B7DDD',
  // dashboard
  darkGreen: '#1F4D3A',
  bar: '#3DB880',
  cardBorder: '#DADADA',
};

const formatMoney = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

/* ================= DỮ LIỆU ================= */
const JOB = {
  poster: 'Phương Vy',
  rating: '4.9',
  ratingLabel: 'vàng',
  postedAgo: 'Đã đăng tải 5 phút trước',
  title: 'Nhận hàng Shopee ở cổng sau KTX khu B',
  desc:
    'Cần một bạn lấy giúp mình đơn hàng shopee 3107 mang lên trước phòng 409 tòa D4 giúp mình',
  urgentText: 'KHẨN CẤP - trước 15h00',
  pay: 30000,
  time: '14h45 - 15h',
  date: 'Hôm nay',
  location: 'KTX khu B ĐHQG TP Hồ Chí Minh',
  tags: ['Nhận hàng', 'Không yêu cầu kinh nghiệm'],
};

const REVENUE = {
  total: 3500000,
  growth: 12,
  thisMonth: 1600000,
  jobsDone: 8,
  chart: [
    { label: 'T4', value: 1200000, height: 62 },
    { label: 'T5', value: 650000, height: 32 },
    { label: 'T6', value: 1500000, height: 78 },
    { label: 'T7', value: 1000000, height: 52 },
    { label: 'T8', value: 1800000, height: 96 },
  ],
  transactions: [
    { id: 1, type: 'Urgency', icon: 'alarm-light-outline', color: '#D40000', title: 'Hoàn thành: Urgent', time: 'Hôm qua, 14:20', amount: 30000 },
    { id: 2, type: 'Pet', icon: 'paw', color: '#111', title: 'Hoàn thành: Pet', time: 'Hôm qua, 16:30', amount: 40000 },
    { id: 3, type: 'Cleaning', icon: 'broom', color: '#111', title: 'Hoàn thành: Cleaning', time: '20/08/2026', amount: 50000 },
    { id: 4, type: 'Moving', icon: 'package-variant-closed', color: '#111', title: 'Hoàn thành: Moving', time: '18/08/2026', amount: 25000 },
  ],
};

/* ================= AVATAR ================= */
const Avatar = ({ name, size = 48 }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: '#3A3A3A',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text style={{ color: '#fff', fontWeight: '700', fontSize: size * 0.4 }}>
      {name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
    </Text>
  </View>
);

/* =====================================================
   MÀN 1: CHI TIẾT CÔNG VIỆC (HOME)
   ===================================================== */
function JobDetailScreen({ job = JOB, onBack, onChat, onAccept }) {
  const [saved, setSaved] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);

  const handleBack = () => {
    if (onBack) onBack();
    else Alert.alert('Quay lại', 'Nút quay lại (nối với navigation của bạn).');
  };

  const handleAccept = () => {
    Alert.alert(
      'Xác nhận nhận việc',
      `Bạn muốn nhận công việc này với thù lao ${formatMoney(job.pay)} vnd?`,
      [
        { text: 'Huỷ', style: 'cancel' },
        {
          text: 'Nhận việc',
          onPress: () => {
            setAccepted(true);
            if (onAccept) onAccept(job);
          },
        },
      ]
    );
  };

  const handleChat = () => {
    if (onChat) onChat(job);
    else Alert.alert('Chat', `Mở cuộc trò chuyện với ${job.poster}.`);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.headerBtn}>
          <Ionicons name="chevron-back" size={26} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết công việc</Text>
        <TouchableOpacity onPress={() => setSaved(!saved)} style={styles.headerBtn}>
          <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={24} color="#222" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.posterRow}>
          <Avatar name={job.poster} />
          <Text style={styles.posterName}>{job.poster}</Text>
          <Ionicons name="checkmark-circle" size={16} color={COLORS.blue} style={{ marginLeft: 4 }} />
          <Ionicons name="star" size={13} color={COLORS.star} style={{ marginLeft: 14 }} />
          <Text style={styles.ratingText}>
            {' '}
            {job.rating} ({job.ratingLabel})
          </Text>
        </View>
        <Text style={styles.postedAgo}>{job.postedAgo}</Text>

        <Text style={styles.jobTitle}>{job.title}</Text>
        <Text style={styles.jobDesc}>{job.desc}</Text>

        <View style={styles.urgentChip}>
          <Text style={styles.urgentText}>{job.urgentText}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Thù lao công việc</Text>
          <Text style={styles.value}>{formatMoney(job.pay)} vnd</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Thời gian thực hiện:</Text>
          <View>
            <Text style={styles.value}>{job.time}</Text>
            <Text style={styles.value}>{job.date}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.locationRow}>
          <Ionicons name="location-sharp" size={30} color="#C62828" />
          <Text style={styles.locationText}>{job.location}</Text>
        </View>

        <Text style={styles.sectionTitle}>Đặc điểm công việc</Text>
        <View style={styles.tagWrap}>
          {job.tags.map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setSelectedTag(selectedTag === t ? null : t)}
              style={[styles.tag, selectedTag === t && styles.tagSelected]}
            >
              <Text style={styles.tagText}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {accepted ? (
          <View style={[styles.primaryBtn, styles.primaryBtnDone]}>
            <Ionicons name="checkmark-circle" size={22} color="#666" />
            <Text style={[styles.primaryBtnText, { color: '#666', marginLeft: 8 }]}>
              Bạn đã nhận công việc này
            </Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.primaryBtn} onPress={handleAccept} activeOpacity={0.8}>
            <Text style={styles.primaryBtnText}>Nhận thực hiện công việc</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.negotiateText}>Bạn cần trao đổi thêm về giá?</Text>

        <TouchableOpacity style={styles.secondaryBtn} onPress={handleChat} activeOpacity={0.8}>
          <Text style={styles.secondaryBtnText}>Chat với người đăng</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

/* =====================================================
   MÀN 2: DOANH THU (DASHBOARD)
   ===================================================== */
function DashboardScreen({ data = REVENUE, onMenu }) {
  const [selectedBar, setSelectedBar] = useState(null); // index cột đang chọn
  const bar = selectedBar !== null ? data.chart[selectedBar] : null;

  const handleMenu = () => {
    if (onMenu) onMenu();
    else Alert.alert('Menu', 'Nút menu (nối với drawer/navigation của bạn).');
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleMenu} style={styles.headerBtn}>
          <Ionicons name="menu" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.dashTitle}>Doanh thu</Text>
        <View style={styles.headerBtn} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 24 }}>
        {/* Tổng doanh thu */}
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>TỔNG DOANH THU ĐÃ NHẬN</Text>
          <Text style={styles.totalValue}>{formatMoney(data.total)}đ</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
            <Ionicons name="trending-up" size={14} color={COLORS.green} />
            <Text style={styles.growthText}>
              {' '}
              <Text style={{ fontWeight: '700', color: COLORS.green }}>Tăng {data.growth}%</Text>
              <Text style={{ color: COLORS.gray }}> so với tháng trước</Text>
            </Text>
          </View>
        </View>

        {/* Biểu đồ cột */}
        <View style={styles.chartCard}>
          <View style={styles.chartTooltipRow}>
            {bar ? (
              <Text style={styles.chartTooltip}>
                {bar.label}: {formatMoney(bar.value)}đ
              </Text>
            ) : (
              <Text style={styles.chartHint}>Chạm vào cột để xem doanh thu</Text>
            )}
          </View>
          <View style={styles.chartRow}>
            {data.chart.map((c, i) => (
              <TouchableOpacity
                key={c.label}
                activeOpacity={0.8}
                style={styles.barCol}
                onPress={() => setSelectedBar(selectedBar === i ? null : i)}
              >
                <View
                  style={[
                    styles.barItem,
                    {
                      height: c.height,
                      opacity: selectedBar === null || selectedBar === i ? 1 : 0.45,
                    },
                  ]}
                />
                <Text style={styles.barLabel}>{c.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 2 ô thống kê */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Tháng này</Text>
            <Text style={styles.statValue}>{formatMoney(data.thisMonth)}đ</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Số việc đã làm:</Text>
            <Text style={styles.statValue}>{data.jobsDone} nhiệm vụ</Text>
          </View>
        </View>

        {/* Giao dịch gần đây */}
        <Text style={styles.recentTitle}>GIAO DỊCH GẦN ĐÂY</Text>
        {data.transactions.map((t, idx) => (
          <View
            key={t.id}
            style={[styles.txRow, idx < data.transactions.length - 1 && styles.txBorder]}
          >
            <View style={styles.txIconBox}>
              <MaterialCommunityIcons name={t.icon} size={34} color={t.color} />
              <Text style={[styles.txIconLabel, t.type === 'Urgency' && { color: '#D40000' }]}>
                {t.type}
              </Text>
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={styles.txTitle}>{t.title}</Text>
              <Text style={styles.txTime}>{t.time}</Text>
            </View>
            <Text style={styles.txAmount}>+{formatMoney(t.amount)} đ</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

/* =====================================================
   THANH TAB DƯỚI
   Chỉ 'home' và 'wallet' có màn hình.
   chat / saved / profile: KHÔNG code (bấm không làm gì).
   ===================================================== */
const TABS = [
  { key: 'home', lib: 'ion', on: 'home', off: 'home-outline', enabled: true },
  { key: 'chat', lib: 'ion', on: 'chatbubble', off: 'chatbubble-outline', enabled: false },
  { key: 'saved', lib: 'ion', on: 'bookmark', off: 'bookmark-outline', enabled: false },
  { key: 'wallet', lib: 'ion', on: 'cash', off: 'cash-outline', enabled: true },
  { key: 'profile', lib: 'ion', on: 'person', off: 'person-outline', enabled: false },
];

function TabBar({ active, onChange }) {
  return (
    <View style={styles.tabBar}>
      {TABS.map((t) => (
        <TouchableOpacity
          key={t.key}
          style={styles.tabItem}
          activeOpacity={t.enabled ? 0.6 : 1}
          onPress={() => t.enabled && onChange(t.key)}
        >
          <Ionicons
            name={active === t.key ? t.on : t.off}
            size={28}
            color={active === t.key ? '#000' : '#7A7A7A'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

/* ================= APP ================= */
export default function App() {
  const [tab, setTab] = useState('home');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={{ flex: 1 }}>
        {tab === 'wallet' ? <DashboardScreen /> : <JobDetailScreen />}
      </View>
      <TabBar active={tab} onChange={setTab} />
    </SafeAreaView>
  );
}

/* ================= STYLE ================= */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },
  headerBtn: { width: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#222' },

  /* --- Chi tiết công việc --- */
  content: { padding: 18, paddingBottom: 30 },
  posterRow: { flexDirection: 'row', alignItems: 'center' },
  posterName: { fontSize: 16, fontWeight: '700', color: '#111', marginLeft: 12 },
  ratingText: { color: COLORS.star, fontSize: 12, fontWeight: '600' },
  postedAgo: { color: COLORS.gray, fontSize: 11, marginTop: 8 },
  jobTitle: { fontSize: 18, fontWeight: '800', marginTop: 16, color: '#111' },
  jobDesc: { fontSize: 15, lineHeight: 22, marginTop: 16, color: '#222' },
  urgentChip: {
    backgroundColor: COLORS.urgentBg,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    marginTop: 22,
  },
  urgentText: { color: COLORS.urgentText, fontWeight: '800', fontSize: 14 },
  divider: { height: 1, backgroundColor: COLORS.line, marginVertical: 14 },
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  label: { fontSize: 15, fontWeight: '700', color: '#111', width: 160 },
  value: { fontSize: 15, fontWeight: '700', color: COLORS.green },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  locationText: { fontSize: 14, fontWeight: '600', marginLeft: 10, color: '#222', flex: 1 },
  sectionTitle: { fontSize: 15, fontWeight: '700', marginTop: 18, marginBottom: 10, color: '#111' },
  tagWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    backgroundColor: '#F4F4F4',
    marginRight: 10,
    marginBottom: 8,
  },
  tagSelected: { borderColor: COLORS.blue, borderWidth: 2, backgroundColor: '#fff' },
  tagText: { fontSize: 13, color: '#222' },
  primaryBtn: {
    marginTop: 24,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.greenBtn,
    borderWidth: 1,
    borderColor: COLORS.greenBorder,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primaryBtnDone: { backgroundColor: '#E8E8E8', borderColor: '#CFCFCF' },
  primaryBtnText: { fontSize: 16, fontWeight: '800', color: COLORS.greenText },
  negotiateText: { textAlign: 'center', fontSize: 12, marginTop: 22, color: '#111' },
  secondaryBtn: {
    marginTop: 14,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: COLORS.greenBorder,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: { fontSize: 15, fontWeight: '700', color: COLORS.greenText },

  /* --- Dashboard --- */
  dashTitle: { fontSize: 20, fontWeight: '800', color: '#111' },
  totalCard: {
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 22,
    alignItems: 'center',
    paddingVertical: 18,
    backgroundColor: '#fff',
  },
  totalLabel: { fontSize: 13, fontWeight: '600', color: COLORS.darkGreen },
  totalValue: { fontSize: 38, fontWeight: '800', color: COLORS.darkGreen, marginTop: 4 },
  growthText: { fontSize: 12 },

  chartCard: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 22,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  chartTooltipRow: { height: 22, alignItems: 'center', justifyContent: 'center' },
  chartTooltip: { fontSize: 13, fontWeight: '700', color: COLORS.darkGreen },
  chartHint: { fontSize: 11, color: '#B5B5B5' },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
    paddingHorizontal: 6,
  },
  barCol: { alignItems: 'center', justifyContent: 'flex-end', width: 40 },
  barItem: { width: 36, backgroundColor: COLORS.bar, borderTopLeftRadius: 3, borderTopRightRadius: 3 },
  barLabel: { fontSize: 10, color: COLORS.gray, marginTop: 4 },

  statsRow: { flexDirection: 'row', marginTop: 16 },
  statBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 18,
    backgroundColor: '#fff',
  },
  statLabel: { fontSize: 13, color: COLORS.gray },
  statValue: { fontSize: 17, fontWeight: '800', color: '#111', marginTop: 4 },

  recentTitle: {
    marginTop: 24,
    marginBottom: 6,
    fontSize: 14,
    color: COLORS.gray,
    letterSpacing: 0.5,
  },
  txRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  txBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.line },
  txIconBox: { width: 62, alignItems: 'center' },
  txIconLabel: { fontSize: 10, fontWeight: '700', marginTop: 2, color: '#111' },
  txTitle: { fontSize: 15, color: '#111' },
  txTime: { fontSize: 11, color: '#B0B0B0', marginTop: 3 },
  txAmount: { fontSize: 15, fontWeight: '800', color: COLORS.green },

  /* --- Tab bar --- */
  tabBar: {
    flexDirection: 'row',
    height: 64,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
    backgroundColor: '#fff',
  },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
